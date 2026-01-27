import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthProvider, QueryProvider, TenantProvider } from '@gaqno-development/frontcore'
import { Tabs, TabsList, TabsTrigger } from '@gaqno-development/frontcore/components/ui'
import { BookOpen, Music, Image, Video } from 'lucide-react'
import BookPage from './pages/BookPage'
import AudioPage from './pages/AudioPage'
import ImagesPage from './pages/ImagesPage'
import VideoPage from './pages/VideoPage'

const AI_TABS = [
  { id: 'books', label: 'Books', icon: BookOpen },
  { id: 'audio', label: 'Audio', icon: Music },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'video', label: 'Video', icon: Video },
] as const

const VIEW_ROUTES: Record<string, string> = {
  books: '/ai/books',
  audio: '/ai/audio',
  images: '/ai/images',
  video: '/ai/video',
}

const PATHNAME_VIEW_MAP: Record<string, string> = {
  '/ai/books': 'books',
  '/ai/audio': 'audio',
  '/ai/images': 'images',
  '/ai/video': 'video',
}

function AIPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const pathname = location.pathname

  const viewFromPath = PATHNAME_VIEW_MAP[pathname] ?? (pathname.startsWith('/ai/books') ? 'books' : null)
  const currentView = viewFromPath ?? 'books'

  React.useEffect(() => {
    if (pathname === '/ai' || pathname === '/ai/') {
      navigate('/ai/books', { replace: true })
    }
  }, [pathname, navigate])

  const handleTabChange = (view: string) => {
    const route = VIEW_ROUTES[view] ?? VIEW_ROUTES.books
    navigate(route)
  }

  const renderView = () => {
    if (pathname.startsWith('/ai/books')) return <BookPage />
    if (pathname === '/ai/audio') return <AudioPage />
    if (pathname === '/ai/images') return <ImagesPage />
    if (pathname === '/ai/video') return <VideoPage />
    if (pathname === '/ai' || pathname === '/ai/') return null
    return <BookPage />
  }

  if (pathname === '/ai' || pathname === '/ai/') {
    return null
  }

  return (
    <div className="flex flex-col h-full">
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold mb-4">AI</h1>
          <Tabs value={currentView} onValueChange={handleTabChange}>
            <TabsList>
              {AI_TABS.map((tab) => {
                const Icon = tab.icon
                return (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {Icon && <Icon className="h-4 w-4 mr-2" />}
                    {tab.label}
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        {renderView()}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <TenantProvider>
          <AIPage />
        </TenantProvider>
      </AuthProvider>
    </QueryProvider>
  )
}
