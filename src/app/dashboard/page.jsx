import Items from './ui/Items';
import Tabs from './ui/Tabs';
import NoItemsFallback from './ui/NoItemsFallback';
import {
  CategoryIcon,
  PostIcon,
  ProjectIcon,
  ReviewIcon,
  UserIcon,
} from './ui/Icons';
import { fetchDashboardData } from '@/lib/fetchData';
import { removeProjectAction } from '@/app/actions/projectActions';
import { removePostAction } from '@/app/actions/postActions';
import { removeCategoryAction } from '@/app/actions/categoryActions';
import { removeUserAction } from '@/app/actions/userActions';
import {
  approveReviewAction,
  removeReviewAction,
} from '@/app/actions/reviewActions';

const tabConfig = {
  projects: {
    headers: ['Projects', 'Project', 'Raised', 'Goal'],
    removeAction: removeProjectAction,
  },
  posts: { headers: ['Posts', 'Post'], removeAction: removePostAction },
  categories: {
    headers: ['Categories', 'Category'],
    removeAction: removeCategoryAction,
  },
  reviews: {
    headers: ['Reviews', 'Review'],
    removeAction: removeReviewAction,
    approveAction: approveReviewAction,
  },
  users: { headers: ['Users', 'User'], removeAction: removeUserAction },
};

const tabDefinitions = {
  projects: { label: 'Projects', icon: <ProjectIcon /> },
  posts: { label: 'Posts', icon: <PostIcon /> },
  categories: { label: 'Categories', icon: <CategoryIcon /> },
  reviews: { label: 'Reviews', icon: <ReviewIcon /> },
  users: { label: 'Users', icon: <UserIcon /> },
};

const createTab = (key, label, icon, items) => ({
  key,
  label,
  icon,
  content:
    items?.length > 0 ? (
      <Items items={items} {...tabConfig[key]} />
    ) : (
      <NoItemsFallback />
    ),
});

async function DashboardContent({ dataPromise }) {
  const {
    projects = [],
    posts = [],
    categories = [],
    reviews = [],
    users = [],
  } = await dataPromise;

  const tabs = Object.entries(tabDefinitions).map(([key, { label, icon }]) =>
    createTab(
      key,
      label,
      icon,
      { projects, posts, categories, reviews, users }[key]
    )
  );

  return <Tabs tabs={tabs} />;
}

export default function Dashboard() {
  const dataPromise = fetchDashboardData().catch((error) => {
    console.error('Failed to fetch dashboard data:', error);
    return { projects: [], posts: [], categories: [], reviews: [], users: [] };
  });

  return <DashboardContent dataPromise={dataPromise} />;
}
