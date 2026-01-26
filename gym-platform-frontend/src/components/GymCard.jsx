import { MapPin, Dumbbell, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scaleOnHover } from '../utils/animations';

const GymCard = ({ gym }) => {
    return (
        <motion.div
            whileHover={scaleOnHover}
            className="block group h-full bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col relative"
        >
            <Link to={`/gyms/${gym._id}`} className="block h-48 bg-gray-200 dark:bg-gray-700 w-full object-cover flex items-center justify-center text-gray-400 dark:text-gray-500 relative overflow-hidden">
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-shimmer" />

                {gym.images && gym.images.length > 0 ? (
                    <img
                        src={gym.images[0]}
                        alt={gym.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <Dumbbell className="h-12 w-12" />
                )}
            </Link>
            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start">
                    <Link to={`/gyms/${gym._id}`} className="block">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{gym.name}</h3>
                    </Link>
                    <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            {gym.averageRating ? gym.averageRating.toFixed(1) : 'New'}
                            {gym.reviewCount > 0 && <span className="text-gray-400 dark:text-gray-500 text-xs ml-1">({gym.reviewCount})</span>}
                        </span>
                    </div>
                </div>
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${gym.city}, ${gym.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mt-2 text-gray-500 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors w-fit"
                    onClick={(e) => e.stopPropagation()}
                >
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{gym.city}, {gym.address}</span>
                </a>
                <Link to={`/gyms/${gym._id}`} className="block flex-1 mt-3">
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">{gym.description || "No description available."}</p>
                </Link>
                <div className="mt-4 flex flex-wrap gap-2">
                    {gym.facilities?.slice(0, 3).map((facility, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {facility}
                        </span>
                    ))}
                    {gym.facilities?.length > 3 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                            +{gym.facilities.length - 3} more
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default GymCard;
