'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Pause, Play, RotateCcw, Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PomodoroSettings {
  workDuration: number;
  breakDuration: number;
}

const INITIAL_WORK_DURATION = 25;
const INITIAL_BREAK_DURATION = 5;

const PomodoroTimer: React.FC = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState<PomodoroSettings>({
    workDuration: INITIAL_WORK_DURATION,
    breakDuration: INITIAL_BREAK_DURATION,
  });
  
  const [isWorking, setIsWorking] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(INITIAL_WORK_DURATION * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [totalWorkTime, setTotalWorkTime] = useState(0);
  const [totalBreakTime, setTotalBreakTime] = useState(0);

  useEffect(() => {
    const savedSettings = localStorage.getItem('pomodoroSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings) as PomodoroSettings;
      setSettings(parsed);
      setTimeRemaining(parsed.workDuration * 60);
    }
  }, []);

  const saveSettings = useCallback((newSettings: PomodoroSettings) => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(newSettings));
    setSettings(newSettings);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime > 0) {
            if (isWorking) {
              setTotalWorkTime((prev) => prev + 1);
            } else {
              setTotalBreakTime((prev) => prev + 1);
            }
            return prevTime - 1;
          }
          return 0;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, isWorking]);

  useEffect(() => {
    if (timeRemaining === 0) {
      const nextSession = !isWorking;
      setIsWorking(nextSession);
      if (!nextSession) {
        setPomodoroCount((count) => count + 1);
      }
      setTimeRemaining(nextSession ? settings.workDuration * 60 : settings.breakDuration * 60);
      
      toast({
        title: `${nextSession ? 'Work' : 'Break'} Time!`,
        description: `Starting ${nextSession ? 'work' : 'break'} session...`,
        variant: nextSession ? 'default' : 'destructive',
      });
    }
  }, [timeRemaining, isWorking, settings, toast]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleWorkDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      const newSettings = { ...settings, workDuration: value };
      saveSettings(newSettings);
      if (isWorking && !isTimerRunning) {
        setTimeRemaining(value * 60);
      }
    }
  };

  const handleBreakDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      const newSettings = { ...settings, breakDuration: value };
      saveSettings(newSettings);
      if (!isWorking && !isTimerRunning) {
        setTimeRemaining(value * 60);
      }
    }
  };

  const handleStartTimer = () => setIsTimerRunning(true);
  const handlePauseTimer = () => setIsTimerRunning(false);
  const handleResetTimer = () => {
    setIsTimerRunning(false);
    setIsWorking(true);
    setTimeRemaining(settings.workDuration * 60);
    setPomodoroCount(0);
    setTotalWorkTime(0);
    setTotalBreakTime(0);
  };

  const totalSeconds = isWorking ? settings.workDuration * 60 : settings.breakDuration * 60;
  const progress = Math.min(((totalSeconds - timeRemaining) / totalSeconds) * 100, 100);

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg bg-gradient-to-br from-background to-muted transition-all duration-300">
      <CardHeader className="text-center pb-2">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Timer className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Pomodoro Timer
          </CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full blur-3xl transform -translate-y-1/2" />
          <div className="relative">
            <div className={`text-7xl font-bold mb-3 transition-colors duration-300 ${
              isWorking ? 'text-primary' : 'text-destructive'
            }`}>
              {formatTime(timeRemaining)}
            </div>
            <div className={`text-lg font-medium transition-colors duration-300 ${
              isWorking ? 'text-primary/80' : 'text-destructive/80'
            }`}>
              {isWorking ? 'Work Session' : 'Break Session'}
            </div>
          </div>
        </div>

        <Progress 
          value={progress} 
          className={`h-2 transition-all duration-300 ${
            isWorking ? 'bg-primary/20' : 'bg-destructive/20'
          }`} 
        />

        <div className="flex justify-center space-x-4">
          {!isTimerRunning ? (
            <Button 
              onClick={handleStartTimer} 
              size="lg"
              className="transition-transform hover:scale-105"
            >
              <Play className="mr-2 h-4 w-4" /> Start
            </Button>
          ) : (
            <Button 
              onClick={handlePauseTimer} 
              size="lg" 
              variant="secondary"
              className="transition-transform hover:scale-105"
            >
              <Pause className="mr-2 h-4 w-4" /> Pause
            </Button>
          )}
          <Button 
            onClick={handleResetTimer} 
            size="lg" 
            variant="outline"
            className="transition-transform hover:scale-105"
          >
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="workDuration" className="text-sm font-medium">
              Work Duration (min)
            </Label>
            <Input
              id="workDuration"
              type="number"
              min="1"
              value={settings.workDuration}
              onChange={handleWorkDurationChange}
              disabled={isTimerRunning}
              className="transition-all focus:scale-105"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="breakDuration" className="text-sm font-medium">
              Break Duration (min)
            </Label>
            <Input
              id="breakDuration"
              type="number"
              min="1"
              value={settings.breakDuration}
              onChange={handleBreakDurationChange}
              disabled={isTimerRunning}
              className="transition-all focus:scale-105"
            />
          </div>
        </div>

        <div className="bg-muted/50 backdrop-blur-sm p-6 rounded-lg space-y-3 border border-primary/10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pomodoros Completed</span>
            <span className="font-semibold text-lg">{pomodoroCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Work Time</span>
            <span className="font-semibold text-lg">{formatDuration(totalWorkTime)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Break Time</span>
            <span className="font-semibold text-lg">{formatDuration(totalBreakTime)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;