/**
 * Runtime Access Layer for Link Graph
 * 
 * Provides O(1) access to the prebuilt link graph data.
 * All graph computation is done at build time.
 */

export interface LinkMention {
  sourcePostId: string;
  sourcePostTitle: string;
  linkText: string;
  excerpt: string;
  context: string;
}

export interface LinkGraph {
  backlinks: Record<string, LinkMention[]>;
  forwardlinks: Record<string, string[]>;
  allPostIds: string[];
  buildTime: string;
  totalLinks: number;
}

let cachedGraph: LinkGraph | null = null;

/**
 * Load the link graph from the static JSON file
 */
async function loadGraph(): Promise<LinkGraph> {
  if (cachedGraph) {
    return cachedGraph;
  }

  try {
    const response = await fetch('/link-graph.json');
    if (!response.ok) {
      throw new Error(`Failed to load link graph: ${response.statusText}`);
    }
    cachedGraph = await response.json();
    return cachedGraph;
  } catch (error) {
    console.error('Error loading link graph:', error);
    // Return empty graph as fallback
    return {
      backlinks: {},
      forwardlinks: {},
      allPostIds: [],
      buildTime: new Date().toISOString(),
      totalLinks: 0,
    };
  }
}

/**
 * Get backlinks for a specific post
 * @param postId - The post ID to get backlinks for
 * @returns Array of link mentions (O(1) lookup)
 */
export async function getBacklinks(postId: string): Promise<LinkMention[]> {
  const graph = await loadGraph();
  return graph.backlinks[postId] || [];
}

/**
 * Check if a post has any backlinks
 * @param postId - The post ID to check
 * @returns true if the post has backlinks (O(1) lookup)
 */
export async function hasBacklinks(postId: string): Promise<boolean> {
  const graph = await loadGraph();
  const backlinks = graph.backlinks[postId];
  return backlinks !== undefined && backlinks.length > 0;
}

/**
 * Get forward links for a specific post
 * @param postId - The post ID to get forward links for
 * @returns Array of post IDs that this post links to (O(1) lookup)
 */
export async function getForwardlinks(postId: string): Promise<string[]> {
  const graph = await loadGraph();
  return graph.forwardlinks[postId] || [];
}

/**
 * Get the entire link graph
 * Useful for debugging or advanced use cases
 */
export async function getGraph(): Promise<LinkGraph> {
  return loadGraph();
}

/**
 * Get all post IDs that have content in the graph
 */
export async function getAllPostIds(): Promise<string[]> {
  const graph = await loadGraph();
  return graph.allPostIds;
}

/**
 * Get build time of the graph
 */
export async function getGraphBuildTime(): Promise<string> {
  const graph = await loadGraph();
  return graph.buildTime;
}
