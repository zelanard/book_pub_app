import React from 'react';
import { Box, Card, CardContent } from '@mui/material';

const DocFXIframe = () => {
  return (
    <Box sx={{ width: '100%', height: '85vh' }}>
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardContent sx={{ padding: 0, height: '100%' }}>
          <iframe
            src="/_site/index.html"
            title="DocFX Documentation"
            style={{ width: '100%', height: '100%', border: 'none' }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DocFXIframe;