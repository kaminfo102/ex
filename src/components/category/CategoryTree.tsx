import React from 'react';

interface Category {
  category_id: number;
  category_name: string;
  parent_id?: number;
  children?: Category[];
}

interface Props {
  categories: Category[];
}

function buildTree(categories: Category[]): Category[] {
  const categoryMap = new Map<number, Category>();
  const tree: Category[] = [];

  // First pass: Create map of categories
  categories.forEach(category => {
    categoryMap.set(category.category_id, { ...category, children: [] });
  });

  // Second pass: Build tree structure
  categories.forEach(category => {
    const node = categoryMap.get(category.category_id);
    if (category.parent_id && categoryMap.has(category.parent_id)) {
      const parent = categoryMap.get(category.parent_id);
      parent?.children?.push(node!);
    } else {
      tree.push(node!);
    }
  });

  return tree;
}

function TreeNode({ node, level = 0 }: { node: Category; level?: number }) {
  return (
    <div className={`mr-${level * 4}`}>
      <div className="flex items-center py-2">
        <span className="text-gray-400 ml-2">{'├─'.repeat(level > 0 ? 1 : 0)}</span>
        <span>{node.category_name}</span>
      </div>
      {node.children?.map(child => (
        <TreeNode key={child.category_id} node={child} level={level + 1} />
      ))}
    </div>
  );
}

export default function CategoryTree({ categories }: Props) {
  const tree = buildTree(categories);

  return (
    <div className="space-y-2">
      {tree.map(node => (
        <TreeNode key={node.category_id} node={node} />
      ))}
    </div>
  );
}