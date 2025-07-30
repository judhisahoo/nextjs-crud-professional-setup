'use client';

import React, { createContext, useState, useContext } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

type MessageType = 'success' | 'error' | 'info' | 'warning';

interface MessageProps {
  type: MessageType;
  title: string;
  body: string;
  url?: string;
}

interface MessageContextType {
  showMessage: (msg: MessageProps) => void;
}

const MessageContext = createContext<MessageContextType>({
  showMessage: () => {},
});

export function useMessage() {
  return useContext(MessageContext);
}

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<MessageProps | null>(null);

  const showMessage = (msg: MessageProps) => {
    setMessage(msg);
    setOpen(true);
  };

  const renderIcon = () => {
    if (message?.type === 'success') {
      return <CheckCircleIcon sx={{ color: 'green', mr: 1 }} />;
    } else if (message?.type === 'error') {
      return <ErrorIcon sx={{ color: 'red', mr: 1 }} />;
    }
    return null;
  };

  const handleClose = () => {
    setOpen(false);
    if (message?.url) {
      router.push(message.url);
    }
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '300px',
            mx: 'auto',
            my: 'auto',
          },
        }}
      >
        <DialogTitle sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center' }}>
          {renderIcon()}
          {message?.title}
        </DialogTitle>
        <DialogContent sx={{ minHeight: 110, px: 2, py: 1 }}>
          <DialogContentText>{message?.body}</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ minHeight: 50, px: 2, py: 1 }}>
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            color={message?.type || 'info'}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </MessageContext.Provider>
  );
}
