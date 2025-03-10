import LargeNav from './LargeNav';
import MobileNav from './MobileNav';

export default function Sidebar() {
  return (
    <aside className="sticky top-0 max-h-screen shadow-lg">
      <MobileNav />
      <LargeNav />
    </aside>
  );
}
