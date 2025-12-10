import { FeedList } from "./FeedList";

export default function Feeds() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-extrabold mb-8 text-center md:text-left 
               bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Meet Our Users
      </h1>
      
      {/* Responsive grid wrapper */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeedList />
      </div>
    </div>
  );
}