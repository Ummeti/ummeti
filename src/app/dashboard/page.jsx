import Items from './ui/Items';
import Tabs from './ui/Tabs';
import {
  CategoryIcon,
  PostIcon,
  ProjectIcon,
  ReviewIcon,
  UserIcon,
} from './ui/Icons';
import { removeProjectAction } from '@/app/actions/projectActions';
import { removePostAction } from '@/app/actions/postActions';
import { removeCategoryAction } from '../actions/categoryActions';
import { fetchDashboardData, fetchUsers } from '@/lib/fetchData';
import { removeUserAction } from '../actions/userActions';
import {
  approveReviewAction,
  removeReviewAction,
} from '../actions/reviewActions';

export default async function Dashboard() {
  const { projects, posts, categories, reviews, users } =
    await fetchDashboardData();

  const tabConfig = {
    projects: {
      headers: ['Projects', 'Project', 'Raised', 'Goal'],
      removeAction: removeProjectAction,
    },
    posts: {
      headers: ['Posts', 'Post'],
      removeAction: removePostAction,
    },
    categories: {
      headers: ['Categories', 'Category'],
      removeAction: removeCategoryAction,
    },
    reviews: {
      headers: ['Reviews', 'Review'],
      removeAction: removeReviewAction,
      approveAction: approveReviewAction,
    },
    users: {
      headers: ['Users', 'User'],
      removeAction: removeUserAction,
    },
  };

  const tabs = [
    {
      key: 'projects',
      label: 'Projects',
      icon: <ProjectIcon />,
      content: <Items items={projects} {...tabConfig.projects} />,
    },
    {
      key: 'posts',
      label: 'Posts',
      icon: <PostIcon />,
      content: <Items items={posts} {...tabConfig.posts} />,
    },
    {
      key: 'categories',
      label: 'Categories',
      icon: <CategoryIcon />,
      content: <Items items={categories} {...tabConfig.categories} />,
    },
    {
      key: 'reviews',
      label: 'Reviews',
      icon: <ReviewIcon />,
      content: <Items items={reviews} {...tabConfig.reviews} />,
    },
    {
      key: 'users',
      label: 'Users',
      icon: <UserIcon />,
      content: <Items items={users} {...tabConfig.users} />,
    },
  ];

  return <Tabs tabs={tabs} />;
}
