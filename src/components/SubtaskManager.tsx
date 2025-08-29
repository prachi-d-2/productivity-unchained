import { useState } from 'react';
import { Plus, Check, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Subtask } from '../types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface SubtaskManagerProps {
  subtasks: Subtask[];
  onUpdateSubtasks: (subtasks: Subtask[]) => void;
  taskCompleted?: boolean;
}

export const SubtaskManager = ({ subtasks, onUpdateSubtasks, taskCompleted = false }: SubtaskManagerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;

    const newSubtask: Subtask = {
      id: Date.now().toString(),
      title: newSubtaskTitle.trim(),
      completed: false,
      createdAt: new Date(),
    };

    onUpdateSubtasks([...subtasks, newSubtask]);
    setNewSubtaskTitle('');
    setIsAddingSubtask(false);
  };

  const handleToggleSubtask = (subtaskId: string) => {
    const updatedSubtasks = subtasks.map(subtask =>
      subtask.id === subtaskId
        ? { ...subtask, completed: !subtask.completed }
        : subtask
    );
    onUpdateSubtasks(updatedSubtasks);
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    const updatedSubtasks = subtasks.filter(subtask => subtask.id !== subtaskId);
    onUpdateSubtasks(updatedSubtasks);
  };

  const completedCount = subtasks.filter(s => s.completed).length;
  const hasSubtasks = subtasks.length > 0;

  if (!hasSubtasks && !isAddingSubtask && taskCompleted) {
    return null;
  }

  return (
    <div className="mt-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 p-0 font-normal text-xs hover:bg-transparent"
            disabled={taskCompleted && !hasSubtasks}
          >
            {isOpen ? (
              <ChevronDown className="w-3 h-3 mr-1" />
            ) : (
              <ChevronRight className="w-3 h-3 mr-1" />
            )}
            {hasSubtasks ? (
              <span className="text-muted-foreground">
                Subtasks ({completedCount}/{subtasks.length})
              </span>
            ) : (
              <span className="text-muted-foreground">Add subtasks</span>
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="mt-2">
          <div className="space-y-2 pl-4">
            {subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center gap-2 group">
                <Checkbox
                  checked={subtask.completed}
                  onCheckedChange={() => handleToggleSubtask(subtask.id)}
                  disabled={taskCompleted}
                  className="h-4 w-4"
                />
                <span
                  className={`text-sm flex-1 ${
                    subtask.completed 
                      ? 'text-muted-foreground line-through' 
                      : 'text-foreground'
                  }`}
                >
                  {subtask.title}
                </span>
                {!taskCompleted && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteSubtask(subtask.id)}
                    className="h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
            ))}
            
            {isAddingSubtask ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  placeholder="Enter subtask..."
                  className="h-8 text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddSubtask();
                    if (e.key === 'Escape') {
                      setIsAddingSubtask(false);
                      setNewSubtaskTitle('');
                    }
                  }}
                  autoFocus
                />
                <Button
                  size="sm"
                  onClick={handleAddSubtask}
                  className="h-8 w-8 p-0"
                  disabled={!newSubtaskTitle.trim()}
                >
                  <Check className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setIsAddingSubtask(false);
                    setNewSubtaskTitle('');
                  }}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              !taskCompleted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingSubtask(true)}
                  className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Add subtask
                </Button>
              )
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};