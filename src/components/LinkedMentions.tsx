/**
 * LinkedMentions Component
 * 
 * Displays backlinks (linked mentions) for a blog post.
 * Shows posts that reference the current post with excerpts and context.
 */

import React, { useEffect, useState } from 'react';
import { getBacklinks, type LinkMention } from '@/lib/linked-mentions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LinkedMentionsProps {
  postId: string;
  compact?: boolean;
  className?: string;
}

export function LinkedMentions({ postId, compact = false, className = '' }: LinkedMentionsProps) {
  const [mentions, setMentions] = useState<LinkMention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMentions() {
      try {
        setLoading(true);
        const backlinks = await getBacklinks(postId);
        setMentions(backlinks);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load linked mentions');
        console.error('Error loading linked mentions:', err);
      } finally {
        setLoading(false);
      }
    }

    loadMentions();
  }, [postId]);

  // Don't render if no mentions
  if (loading) {
    return null;
  }

  if (error) {
    console.error('LinkedMentions error:', error);
    return null;
  }

  if (mentions.length === 0) {
    return null;
  }

  return (
    <section className={`linked-mentions mt-12 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Linked Mentions</CardTitle>
          <CardDescription>
            {mentions.length} {mentions.length === 1 ? 'post' : 'posts'} reference this article
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mentions.map((mention, index) => (
              <div key={`${mention.sourcePostId}-${index}`} className="border-l-2 border-gray-200 pl-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <a
                    href={`/posts/${mention.sourcePostId}`}
                    className="text-lg font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {mention.sourcePostTitle}
                  </a>
                  <Badge variant="secondary" className="shrink-0">
                    {mention.linkText}
                  </Badge>
                </div>
                
                {!compact && mention.excerpt && (
                  <p className="text-sm text-gray-600 mb-2">
                    {mention.excerpt}
                  </p>
                )}

                {!compact && mention.context && (
                  <div className="text-sm text-gray-500 italic">
                    {mention.context}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
