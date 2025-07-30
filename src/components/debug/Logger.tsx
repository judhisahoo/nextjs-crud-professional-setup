'use client';

import { Box, Typography, Button } from '@mui/material';
import { useEffect, useState, useRef } from 'react';

export default function Logger() {
  const [logs, setLogs] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalLog = console.log;

    console.log = (...args: unknown[]) => {
      const message = args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : a)).join(' ');
      setLogs((prev) => [...prev, message]);
      originalLog(...args); // still show in browser console
    };

    return () => {
      console.log = originalLog; // restore
    };
  }, []);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  if (!visible) {
    return (
      <Button
        onClick={() => setVisible(true)}
        sx={{ position: 'fixed', bottom: 10, right: 10, zIndex: 9999 }}
        variant="contained"
        color="secondary"
      >
        Show Logs
      </Button>
    );
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        width: 400,
        maxHeight: 250,
        zIndex: 9999,
        bgcolor: '#111',
        color: 'lime',
        border: '1px solid #444',
        borderRadius: 1,
        p: 1,
        overflowY: 'auto',
        fontSize: '0.85rem',
      }}
      ref={logContainerRef}
    >
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Typography fontSize="0.85rem">Logger Output</Typography>
        <Box>
          <Button
            onClick={() => setLogs([])}
            size="small"
            variant="outlined"
            color="inherit"
            sx={{ mr: 1 }}
          >
            Clear
          </Button>
          <Button onClick={() => setVisible(false)} size="small" variant="contained" color="error">
            Hide
          </Button>
        </Box>
      </Box>
      {logs.map((log, i) => (
        <Typography key={i} sx={{ wordBreak: 'break-word' }}>
          {log}
        </Typography>
      ))}
    </Box>
  );
}
