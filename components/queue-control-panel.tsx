import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { QueuePauseStatus, QueueService } from '@/services/queue-service'
import { Pause, Play, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface QueueControlPanelProps {
  terminalId?: number
}

export function QueueControlPanel({ terminalId = 1 }: QueueControlPanelProps) {
  const [status, setStatus] = useState<QueuePauseStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isToggling, setIsToggling] = useState(false)

  const fetchStatus = async () => {
    try {
      setIsLoading(true)
      const currentStatus = await QueueService.getPauseStatus(terminalId)
      setStatus(currentStatus)
    } catch (error) {
      console.error('Failed to fetch queue status:', error)
      toast.error('Failed to fetch queue status')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePause = async () => {
    try {
      setIsToggling(true)
      await QueueService.pauseQueue(terminalId)
      await fetchStatus()
    } catch (error) {
      console.error('Failed to pause queue:', error)
      toast.error('Failed to pause queue')
    } finally {
      setIsToggling(false)
    }
  }

  const handleResume = async () => {
    try {
      setIsToggling(true)
      await QueueService.resumeQueue(terminalId)
      await fetchStatus()
    } catch (error) {
      console.error('Failed to resume queue:', error)
      toast.error('Failed to resume queue')
    } finally {
      setIsToggling(false)
    }
  }

  const handleToggle = async () => {
    try {
      setIsToggling(true)
      const newStatus = await QueueService.toggleQueueStatus(terminalId)
      setStatus(newStatus)
    } catch (error) {
      console.error('Failed to toggle queue status:', error)
      toast.error('Failed to toggle queue status')
    } finally {
      setIsToggling(false)
    }
  }

  useEffect(() => {
    fetchStatus()
    
    // Poll for status updates every 30 seconds
    const interval = setInterval(fetchStatus, 30000)
    
    return () => clearInterval(interval)
  }, [terminalId])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Queue Control Panel
          <Badge variant={status?.isPaused ? "destructive" : "default"}>
            {status?.isPaused ? "Paused" : "Live"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Display */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Current Status:</span>
          <span className={status?.isPaused ? "text-red-600" : "text-green-600"}>
            {isLoading ? "Loading..." : status?.message || "Unknown"}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handlePause}
            disabled={isLoading || isToggling || status?.isPaused}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Pause className="h-4 w-4" />
            Pause
          </Button>
          
          <Button
            onClick={handleResume}
            disabled={isLoading || isToggling || !status?.isPaused}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Resume
          </Button>
        </div>

        {/* Toggle Button */}
        <Button
          onClick={handleToggle}
          disabled={isLoading || isToggling}
          className="w-full flex items-center gap-2"
        >
          <RefreshCw className={cn("h-4 w-4", isToggling && "animate-spin")} />
          {isToggling ? "Toggling..." : "Toggle Status"}
        </Button>

        {/* Refresh Button */}
        <Button
          onClick={fetchStatus}
          disabled={isLoading}
          variant="ghost"
          size="sm"
          className="w-full"
        >
          Refresh Status
        </Button>
      </CardContent>
    </Card>
  )
}

// Helper function for conditional classes
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
