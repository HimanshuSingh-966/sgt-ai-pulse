import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .eq("status", "Published")
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      setLoading(false);
      return;
    }

    if (data) {
      // Increment view count
      await supabase
        .from("posts")
        .update({ views: (data.views || 0) + 1 })
        .eq("id", id);

      setPost(data);
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-lg">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <h2 className="mb-4 text-2xl font-bold">Post not found</h2>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {post.image && (
            <div className="mb-8 overflow-hidden rounded-lg">
              <img
                src={post.image}
                alt={post.title}
                className="h-[400px] w-full object-cover"
              />
            </div>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-3">
            <Badge>{post.category}</Badge>
            {post.featured && (
              <Badge variant="secondary">Featured</Badge>
            )}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold">{post.title}</h1>

          <div className="mb-8 text-xl text-muted-foreground">
            {post.excerpt}
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content.split('\n').map((paragraph: string, index: number) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetail;
