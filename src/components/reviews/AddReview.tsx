import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function AddReview({ onReviewAdded }: { onReviewAdded?: () => void }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!user) {
      setError("Вы должны быть авторизованы.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("reviews").insert({
      user_id: user.id,
      username: user.email,
      content,
      rating,
    });

    if (error) {
      setError(error.message);
    } else {
      setContent("");
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Ваш отзыв"
        required
        className="w-full border rounded p-2"
      />
      <div>
        <label htmlFor="rating">Оценка: </label>
        <select id="rating" value={rating} onChange={e => setRating(Number(e.target.value))}>
          {[5,4,3,2,1].map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? "Отправка..." : "Оставить отзыв"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
} 