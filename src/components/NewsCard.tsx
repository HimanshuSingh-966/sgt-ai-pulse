import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  featured?: boolean;
}

const NewsCard = ({ id, title, excerpt, category, date, author, image, featured }: NewsCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-card-hover" onClick={() => navigate(`/post/${id}`)}>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {featured && (
            <Badge className="absolute right-4 top-4 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant="secondary">{category}</Badge>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        </div>
        
        <h3 className="mb-3 line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
          {title}
        </h3>
        
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {excerpt}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{author}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          variant="ghost" 
          className="group/btn w-full justify-between"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/post/${id}`);
          }}
        >
          Read More
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
