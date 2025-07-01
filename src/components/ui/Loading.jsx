import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'hero') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 animate-pulse">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <div className="h-4 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-16 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="flex gap-4">
                <div className="h-12 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
                <div className="h-12 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'projects') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-card">
            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
            <div className="h-6 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-3"></div>
            <div className="space-y-2 mb-4">
              <div className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
              <div className="h-4 w-5/6 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="h-6 w-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-primary rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export default Loading