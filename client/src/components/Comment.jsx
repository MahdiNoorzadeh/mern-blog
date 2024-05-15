import { useEffect, useState } from "react";
import moment from 'moment';
import 'moment/locale/fa';

moment.locale('fa'); // Set the locale globally once

export default function Comment({ comment }) {
  const [user, setUser] = useState(null); // Initialize as null to properly check for data
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error('Fetching user failed:', error.message);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [comment.userId]);

 
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        {user ? (
          <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture} alt={user.username || 'User avatar'} />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user && user.username ? `@${user.username}` : 'کاربر حذف شده'}
          </span>
          <span className="text-gray-500 text-xs mr-2">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2">{comment.content}</p>
      </div>
    </div>
  );
}
