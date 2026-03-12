import { motion } from 'framer-motion';

function SkeletonCard({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="flex-shrink-0 w-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="w-48 h-72 bg-gray-800 rounded-lg overflow-hidden relative">
            {/* Shimmer animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
            
            {/* Simulated poster shape */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full opacity-20" />
            </div>
          </div>
          
          {/* Title skeleton */}
          <div className="mt-2 space-y-2">
            <div className="h-4 bg-gray-700 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-gray-700 rounded w-1/2 animate-pulse" />
          </div>
        </motion.div>
      ))}
    </>
  );
}

export default SkeletonCard;