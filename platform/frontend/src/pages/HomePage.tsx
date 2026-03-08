import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, TrendingDown, Minus, MapPin, FileText, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Spinner } from '../components/common/Spinner';
import { fetchRegions, fetchArticles, fetchStatistics } from '../api/mockApi';
import type { Region, Article, Statistics } from '../types/api';
import { getImagePath } from '../utils/assets';

// Hero Section Component (Sub-task 7.2)
function HeroSection({ statistics }: { statistics: Statistics | undefined }) {
  if (!statistics) {
    return (
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Spinner size="lg" />
        </div>
      </section>
    );
  }

  const globalIndexScore = statistics.indexScores.global;
  const totalIncidents = statistics.global.totalIncidents;
  const totalRegions = statistics.global.totalRegions;
  const averageSeverity = statistics.global.averageSeverity;

  return (
    <section className="relative bg-gradient-to-br from-navy via-navy-light to-navy py-16 px-4 overflow-hidden">
      {/* Background Image with Blend - Fixed position */}
      <div 
        className="fixed inset-0 opacity-60"
        style={{
          backgroundImage: `url(${getImagePath('/assets/images/photos/Gemini_Generated_Image_8o861s8o861s8o86.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'luminosity',
          filter: 'blur(4px)',
          zIndex: -1,
        }}
      />
      
      {/* Edge Fade Gradients - Horizontal and Vertical - Extended throughout page */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right, rgba(15, 24, 41, 1) 0%, transparent 15%, transparent 85%, rgba(15, 24, 41, 1) 100%),
            linear-gradient(to bottom, rgba(15, 24, 41, 0.8) 0%, transparent 20%, transparent 80%, rgba(15, 24, 41, 0.8) 100%)
          `,
          zIndex: -1,
        }}
      />
      
      {/* Overall Gradient Overlay for text readability - Extended throughout page */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(15, 24, 41, 0.5), rgba(27, 42, 74, 0.6), rgba(15, 24, 41, 0.7))',
          zIndex: -1,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Hindu Hate Index
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            A comprehensive, data-driven platform tracking incidents of hate speech, discrimination, 
            and violence targeting Hindu individuals and communities worldwide.
          </p>

          {/* Global Index Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div 
              className="inline-block bg-gradient-to-br from-navy-light/70 to-navy-light/50 rounded-2xl p-8 border border-navy-light/30 max-w-2xl hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 153, 51, 0.1)'
              }}
            >
              <div className="text-sm font-medium text-foreground/70 mb-4">Global Index Score</div>
              
              {/* Score Display */}
              <div className="text-6xl font-bold text-saffron mb-4">
                {globalIndexScore.toFixed(1)}
              </div>
              
              {/* Visual Scale */}
              <div className="mb-4">
                <div className="relative h-3 bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 to-red-600 rounded-full overflow-hidden">
                  {/* Score Indicator */}
                  <div 
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-white shadow-lg"
                    style={{ left: `${(globalIndexScore / 10) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
                  </div>
                </div>
                
                {/* Scale Labels */}
                <div className="flex justify-between mt-2 text-xs text-foreground/60">
                  <span>0</span>
                  <span className="text-green-400">Low</span>
                  <span className="text-yellow-400">Moderate</span>
                  <span className="text-orange-400">High</span>
                  <span className="text-red-400">Severe</span>
                  <span>10</span>
                </div>
              </div>
              
              {/* Description */}
              <div className="text-sm text-foreground/70 leading-relaxed mb-3">
                The Global Index Score measures the severity and frequency of anti-Hindu hate incidents worldwide. 
                Scores range from 0 (no incidents) to 10 (extreme severity and frequency).
              </div>
              
              <div className="text-sm text-foreground/60">
                Based on {totalIncidents.toLocaleString()} verified incidents
              </div>
            </div>
          </motion.div>

          {/* Key Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div 
              className="bg-gradient-to-br from-navy-light/70 to-navy-light/50 rounded-xl p-6 border border-navy-light/30 hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div className="flex items-center justify-center mb-2">
                <MapPin className="text-saffron mr-2" size={24} />
                <div className="text-3xl font-bold text-saffron">{totalRegions}</div>
              </div>
              <div className="text-sm text-foreground/70">Regions Covered</div>
            </div>

            <div 
              className="bg-gradient-to-br from-navy-light/70 to-navy-light/50 rounded-xl p-6 border border-navy-light/30 hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div className="flex items-center justify-center mb-2">
                <FileText className="text-saffron mr-2" size={24} />
                <div className="text-3xl font-bold text-saffron">
                  {totalIncidents.toLocaleString()}
                </div>
              </div>
              <div className="text-sm text-foreground/70">Total Incidents</div>
            </div>

            <div 
              className="bg-gradient-to-br from-navy-light/70 to-navy-light/50 rounded-xl p-6 border border-navy-light/30 hover:scale-105 transition-all duration-300"
              style={{
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.25)'
              }}
            >
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="text-saffron mr-2" size={24} />
                <div className="text-3xl font-bold text-saffron">
                  {averageSeverity.toFixed(1)}
                </div>
              </div>
              <div className="text-sm text-foreground/70">Average Severity</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// Region Card Component (Sub-task 7.3)
interface RegionCardProps {
  region: Region;
  index: number;
  onClick: () => void;
}

function RegionCard({ region, index, onClick }: RegionCardProps) {
  const stats = region.statistics;
  // Calculate index score on a scale of 1-10 based on severity and incident frequency
  // Formula: weighted average of severity (70%) and normalized incident count (30%)
  const maxIncidents = 1000; // Normalize incidents against this max
  const incidentScore = Math.min((stats.totalIncidents / maxIncidents) * 10, 10);
  const indexScore = Math.min(Math.max((stats.averageSeverity * 0.7) + (incidentScore * 0.3), 1), 10);

  // Determine trend icon
  const TrendIcon = 
    stats.trendIndicator === 'increasing' ? TrendingUp :
    stats.trendIndicator === 'decreasing' ? TrendingDown :
    Minus;

  const trendColor = 
    stats.trendIndicator === 'increasing' ? 'text-red-600' :
    stats.trendIndicator === 'decreasing' ? 'text-green-600' :
    'text-gray-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        variant="elevated"
        hoverable
        onClick={onClick}
        className="h-full"
      >
        <div className="space-y-4">
          {/* Region Header */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-saffron">{region.name}</h3>
              <p className="text-sm text-foreground/60 capitalize">{region.type}</p>
            </div>
            <div className={`flex items-center ${trendColor}`}>
              <TrendIcon size={20} />
              <span className="text-sm font-medium ml-1">
                {Math.abs(stats.percentageChange).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Regional Index Score */}
          <div className="bg-gradient-to-br from-saffron/15 to-maroon/10 rounded-xl p-4 border border-saffron/20">
            <div className="text-sm font-medium mb-1" style={{ color: '#D5672D' }}>Regional Index Score</div>
            <div className="text-3xl font-bold" style={{ color: '#D5672D' }}>
              {indexScore.toFixed(1)}
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-navy-light/60 to-navy-light/40 rounded-xl p-3 border border-navy-light/30">
              <div className="text-2xl font-bold text-saffron">{stats.totalIncidents}</div>
              <div className="text-xs text-foreground/70">Total Incidents</div>
            </div>
            <div className="bg-gradient-to-br from-navy-light/60 to-navy-light/40 rounded-xl p-3 border border-navy-light/30">
              <div className="text-2xl font-bold text-saffron">{stats.knownAccused}</div>
              <div className="text-xs text-foreground/70">Known Accused</div>
            </div>
            <div className="bg-gradient-to-br from-navy-light/60 to-navy-light/40 rounded-xl p-3 border border-navy-light/30">
              <div className="text-2xl font-bold text-saffron">{stats.unknownAccused}</div>
              <div className="text-xs text-foreground/70">Unknown Accused</div>
            </div>
            <div className="bg-gradient-to-br from-navy-light/60 to-navy-light/40 rounded-xl p-3 border border-navy-light/30">
              <div className="text-2xl font-bold text-saffron">{stats.casesFiled}</div>
              <div className="text-xs text-foreground/70">Cases Filed</div>
            </div>
          </div>

          {/* View Details Button */}
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            icon={<ArrowRight size={16} />}
          >
            View Details
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// Featured Article Component (Sub-task 7.6)
interface FeaturedArticleProps {
  article: Article;
  index: number;
  onClick: () => void;
}

function FeaturedArticle({ article, index, onClick }: FeaturedArticleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        variant="elevated"
        hoverable
        onClick={onClick}
        className="h-full overflow-hidden"
        padding="none"
      >
        {/* Featured Image */}
        {article.featuredImage && (
          <div className="aspect-video w-full overflow-hidden bg-navy-light">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="p-6 space-y-3">
          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-block px-3 py-1 bg-gradient-to-br from-saffron/25 to-maroon/20 text-saffron text-xs font-medium rounded-xl border border-saffron/30">
              {article.category}
            </span>
            <span className="text-xs text-foreground/60">
              {article.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-saffron line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-foreground/80 text-sm line-clamp-3">
            {article.excerpt}
          </p>

          {/* Author and Date */}
          <div className="flex items-center justify-between pt-3 border-t border-navy-light">
            <div className="flex items-center gap-2">
              {article.author.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <div className="text-sm font-medium text-foreground">
                  {article.author.name}
                </div>
                <div className="text-xs text-foreground/60">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <ArrowRight size={20} className="text-saffron" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Main HomePage Component (Sub-task 7.1)
export default function HomePage() {
  const navigate = useNavigate();

  // Fetch data (Sub-task 7.8 - loading states)
  const { data: regions, isLoading: regionsLoading, error: regionsError } = useQuery({
    queryKey: ['regions'],
    queryFn: fetchRegions,
  });

  const { data: articlesResponse, isLoading: articlesLoading, error: articlesError } = useQuery({
    queryKey: ['articles', { featured: true }],
    queryFn: () => fetchArticles({ featured: true }, { page: 1, pageSize: 3 }),
  });

  const { data: statistics } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStatistics,
  });

  // Get top regions (limit to 8 for the grid)
  const topRegions = regions
    ?.filter(r => r.type === 'country')
    .sort((a, b) => b.statistics.totalIncidents - a.statistics.totalIncidents)
    .slice(0, 8);

  const featuredArticles = articlesResponse?.data || [];

  return (
    <>
      {/* Hero Section (Sub-task 7.2) */}
      <HeroSection statistics={statistics} />

      {/* World Map Heat Zones Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Global Heat Map
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Visual representation of incident intensity across the world
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => navigate('/heatmap')}
            className="cursor-pointer group"
          >
            <Card
              variant="elevated"
              hoverable
              className="overflow-hidden"
              style={{
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 10px 25px rgba(0, 0, 0, 0.3)'
              }}
            >
              <div className="relative aspect-[2/1] bg-gradient-to-br from-navy-light/40 to-navy/60 p-8 rounded-xl overflow-hidden">
                {/* World Map Image Background */}
                <div 
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundImage: `url(${getImagePath('/assets/images/photos/Gemini_Generated_Image_53rchl53rchl53rc.png')})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.7,
                    mixBlendMode: 'screen',
                    filter: 'brightness(1.2) contrast(1.5)',
                  }}
                />
                
                {/* Heat Zones Overlay */}
                <svg
                  viewBox="0 0 1000 500"
                  className="w-full h-full relative z-10"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Define gradients for heat zones */}
                  <defs>
                    <radialGradient id="heat-high" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#DC2626" stopOpacity="0.2" />
                    </radialGradient>
                    <radialGradient id="heat-medium" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.15" />
                    </radialGradient>
                    <radialGradient id="heat-low" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FCD34D" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#FCD34D" stopOpacity="0.1" />
                    </radialGradient>
                  </defs>

                  {/* Heat Zones - High Intensity */}
                  <circle cx="550" cy="200" r="60" fill="url(#heat-high)" className="animate-pulse" style={{ animationDuration: '3s' }} />
                  <circle cx="700" cy="180" r="70" fill="url(#heat-high)" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
                  {/* Bangladesh - High Intensity */}
                  <circle cx="720" cy="220" r="55" fill="url(#heat-high)" className="animate-pulse" style={{ animationDuration: '3.2s' }} />
                  
                  {/* Heat Zones - Medium Intensity */}
                  <circle cx="200" cy="150" r="50" fill="url(#heat-medium)" className="animate-pulse" style={{ animationDuration: '4s' }} />
                  {/* USA - Medium to High Intensity */}
                  <circle cx="180" cy="140" r="65" fill="url(#heat-medium)" className="animate-pulse" style={{ animationDuration: '3.8s' }} />
                  <circle cx="220" cy="160" r="45" fill="url(#heat-medium)" className="animate-pulse" style={{ animationDuration: '4.3s' }} />
                  {/* UK - Medium Intensity */}
                  <circle cx="500" cy="130" r="50" fill="url(#heat-medium)" className="animate-pulse" style={{ animationDuration: '4.5s' }} />
                  <circle cx="520" cy="130" r="45" fill="url(#heat-medium)" className="animate-pulse" style={{ animationDuration: '4.2s' }} />
                  <circle cx="270" cy="280" r="40" fill="url(#heat-medium)" className="animate-pulse" style={{ animationDuration: '4.2s' }} />
                  
                  {/* Heat Zones - Low Intensity */}
                  <circle cx="820" cy="335" r="35" fill="url(#heat-low)" className="animate-pulse" style={{ animationDuration: '5s' }} />
                  <circle cx="220" cy="200" r="30" fill="url(#heat-low)" className="animate-pulse" style={{ animationDuration: '5.5s' }} />
                </svg>

                {/* Overlay with "View Interactive Map" - Always visible at bottom */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-8 pointer-events-none">
                  <div className="text-center pointer-events-auto">
                    {/* Solid background box for text */}
                    <div className="group bg-gradient-to-br from-navy-light/90 to-navy/90 backdrop-blur-md rounded-2xl px-8 py-6 border-2 border-saffron shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
                      <div className="text-2xl font-bold mb-2" style={{
                        background: 'linear-gradient(90deg, #FF9933, #800020)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        View Interactive Map
                      </div>
                      <div className="flex items-center justify-center gap-2 text-foreground group-hover:text-navy transition-colors duration-300">
                        <span>Explore detailed heat zones</span>
                        <ArrowRight size={20} className="text-saffron group-hover:text-navy transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="p-6 bg-gradient-to-br from-navy-light/60 to-navy-light/40 border-t border-navy-light/30">
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-600"></div>
                    <span className="text-sm text-foreground/80">High Intensity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span className="text-sm text-foreground/80">Medium Intensity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                    <span className="text-sm text-foreground/80">Low Intensity</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Geographic Cards Section (Sub-task 7.4) */}
      <section id="regions" className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Geographic Overview
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Explore regional data and trends across different geographic areas
            </p>
          </motion.div>

          {/* Loading State (Sub-task 7.8) */}
          {regionsLoading && (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          )}

          {/* Error State (Sub-task 7.9) */}
          {regionsError && (
            <div className="text-center py-12">
              <div className="text-red-400 mb-4">
                <AlertTriangle size={48} className="mx-auto mb-2" />
                <p className="text-lg font-medium">Failed to load regions</p>
                <p className="text-sm text-foreground/60">Please try again later</p>
              </div>
            </div>
          )}

          {/* Region Cards Grid (Sub-task 7.4, 7.5) */}
          {topRegions && topRegions.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {topRegions.map((region, index) => (
                <RegionCard
                  key={region.id}
                  region={region}
                  index={index}
                  onClick={() => navigate(`/regions/${region.id}`)}
                />
              ))}
            </div>
          )}

          {/* View All Regions Button */}
          {topRegions && topRegions.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/dashboard')}
                icon={<ArrowRight size={20} />}
              >
                View All Regions
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Incident Categories Section */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Incident Categories
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              Global distribution of hate incidents across different categories
            </p>
          </motion.div>

          {statistics && (() => {
            const totalIncidents = statistics.global.totalIncidents;
            const categories = Object.entries(statistics.byType || {})
              .sort(([, a], [, b]) => (b as number) - (a as number));
            
            // Even more sober orange, red, and yellow shades
            const colors = [
              '#B45309', // Amber-800 (very muted orange)
              '#991B1B', // Red-800 (very muted red)
              '#A16207', // Yellow-700 (very muted yellow)
              '#C2410C', // Orange-700 (muted dark orange)
              '#7C2D12', // Orange-900 (very dark orange)
              '#92400E', // Amber-900 (very dark amber)
              '#854D0E', // Yellow-800 (very muted yellow)
              '#9A3412', // Orange-800 (very muted orange)
            ];

            // Calculate pie chart segments
            let currentAngle = -90; // Start from top
            const segments = categories.map(([category, count], index) => {
              const percentage = ((count as number) / totalIncidents) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              const midAngle = startAngle + angle / 2;
              currentAngle = endAngle;

              // Calculate path for pie segment
              const radius = 160;
              const centerX = 500;
              const centerY = 400;
              
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              const midRad = (midAngle * Math.PI) / 180;
              
              const x1 = centerX + radius * Math.cos(startRad);
              const y1 = centerY + radius * Math.sin(startRad);
              const x2 = centerX + radius * Math.cos(endRad);
              const y2 = centerY + radius * Math.sin(endRad);
              
              const largeArc = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');

              // Calculate label position (inside the segment)
              const labelRadius = radius * 0.65;
              const labelX = centerX + labelRadius * Math.cos(midRad);
              const labelY = centerY + labelRadius * Math.sin(midRad);

              // Calculate line endpoint (outside the segment)
              const lineStartRadius = radius + 10;
              const lineEndRadius = radius + 100;
              const lineStartX = centerX + lineStartRadius * Math.cos(midRad);
              const lineStartY = centerY + lineStartRadius * Math.sin(midRad);
              const lineEndX = centerX + lineEndRadius * Math.cos(midRad);
              const lineEndY = centerY + lineEndRadius * Math.sin(midRad);

              // Determine if label should be on left or right
              const isRightSide = Math.cos(midRad) > 0;
              const labelAnchorX = isRightSide ? lineEndX + 20 : lineEndX - 20;
              const textAnchor = isRightSide ? 'start' : 'end';

              // Split category name into multiple lines if needed
              const maxCharsPerLine = 20;
              const words = category.split(' ');
              const lines: string[] = [];
              let currentLine = '';

              words.forEach(word => {
                if ((currentLine + ' ' + word).trim().length <= maxCharsPerLine) {
                  currentLine = (currentLine + ' ' + word).trim();
                } else {
                  if (currentLine) lines.push(currentLine);
                  currentLine = word;
                }
              });
              if (currentLine) lines.push(currentLine);

              return {
                category,
                count,
                percentage,
                pathData,
                color: colors[index % colors.length],
                startAngle,
                endAngle,
                midAngle,
                labelX,
                labelY,
                lineStartX,
                lineStartY,
                lineEndX,
                lineEndY,
                labelAnchorX,
                textAnchor,
                lines
              };
            });

            return (
              <div className="flex justify-center">
                {/* Pie Chart */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full max-w-4xl mx-auto"
                >
                  <Card
                    variant="elevated"
                    className="p-8"
                    style={{
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 10px 25px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <svg
                      viewBox="0 0 1000 800"
                      className="w-full"
                      style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))' }}
                    >
                      {/* Pie segments */}
                      {segments.map((segment, index) => (
                        <g key={segment.category}>
                          <motion.path
                            d={segment.pathData}
                            fill={segment.color}
                            stroke="#0F1829"
                            strokeWidth="3"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              duration: 0.6, 
                              delay: index * 0.1,
                              ease: "easeOut"
                            }}
                            className="hover:opacity-90 transition-opacity cursor-pointer"
                            style={{ transformOrigin: '500px 400px' }}
                          />
                          
                          {/* Percentage text inside segment */}
                          <motion.text
                            x={segment.labelX}
                            y={segment.labelY}
                            textAnchor="middle"
                            fill="#0F1829"
                            fontSize="16"
                            fontWeight="bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                            style={{ 
                              textShadow: '0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.6)',
                              pointerEvents: 'none'
                            }}
                          >
                            {segment.percentage.toFixed(1)}%
                          </motion.text>

                          {/* Line pointing to label */}
                          <motion.line
                            x1={segment.lineStartX}
                            y1={segment.lineStartY}
                            x2={segment.lineEndX}
                            y2={segment.lineEndY}
                            stroke={segment.color}
                            strokeWidth="2"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.9 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                          />

                          {/* Category label - Multi-line */}
                          {segment.lines.map((line, lineIndex) => (
                            <motion.text
                              key={`${segment.category}-line-${lineIndex}`}
                              x={segment.labelAnchorX}
                              y={segment.lineEndY - 18 + (lineIndex * 18)}
                              textAnchor={segment.textAnchor as any}
                              fill="#FDFAF5"
                              fontSize="16"
                              fontWeight="700"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                              style={{ pointerEvents: 'none' }}
                            >
                              {line}
                            </motion.text>
                          ))}

                          {/* Incident count */}
                          <motion.text
                            x={segment.labelAnchorX}
                            y={segment.lineEndY - 18 + (segment.lines.length * 18) + 16}
                            textAnchor={segment.textAnchor as any}
                            fill={segment.color}
                            fontSize="13"
                            fontWeight="bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                            style={{ pointerEvents: 'none' }}
                          >
                            {segment.count} incidents
                          </motion.text>
                        </g>
                      ))}
                      
                      {/* Center circle for donut effect */}
                      <circle
                        cx="500"
                        cy="400"
                        r="70"
                        fill="#1B2A4A"
                        stroke="#2C3E6B"
                        strokeWidth="3"
                      />
                      
                      {/* Center text */}
                      <text
                        x="500"
                        y="385"
                        textAnchor="middle"
                        fill="#FDFAF5"
                        fontSize="16"
                        fontWeight="600"
                      >
                        Total Incidents
                      </text>
                      <text
                        x="500"
                        y="415"
                        textAnchor="middle"
                        fill="#FF9933"
                        fontSize="32"
                        fontWeight="bold"
                      >
                        {totalIncidents.toLocaleString()}
                      </text>
                    </svg>
                  </Card>
                </motion.div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Featured Articles Section (Sub-task 7.7) */}
      <section id="articles" className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Featured Analysis
            </h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              In-depth articles and analysis from our research team
            </p>
          </motion.div>

          {/* Loading State */}
          {articlesLoading && (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          )}

          {/* Error State */}
          {articlesError && (
            <div className="text-center py-12">
              <div className="text-red-400 mb-4">
                <AlertTriangle size={48} className="mx-auto mb-2" />
                <p className="text-lg font-medium">Failed to load articles</p>
                <p className="text-sm text-foreground/60">Please try again later</p>
              </div>
            </div>
          )}

          {/* Featured Articles Grid */}
          {featuredArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <FeaturedArticle
                  key={article.id}
                  article={article}
                  index={index}
                  onClick={() => navigate(`/articles/${article.id}`)}
                />
              ))}
            </div>
          )}

          {/* View All Articles Button */}
          {featuredArticles.length > 0 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/articles')}
                icon={<ArrowRight size={20} />}
              >
                View All Articles
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
