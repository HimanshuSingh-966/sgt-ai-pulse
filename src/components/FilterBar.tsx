import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterBarProps {
  onCategoryChange?: (category: string) => void;
  onSortChange?: (sort: string) => void;
}

const FilterBar = ({ onCategoryChange, onSortChange }: FilterBarProps) => {
  const categories = ["All", "AI News", "Campus Events", "Research", "Workshops"];
  
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => onCategoryChange?.(category)}
            className="hover:bg-primary hover:text-primary-foreground"
          >
            {category}
          </Button>
        ))}
      </div>
      
      <div className="ml-auto">
        <Select onValueChange={onSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
