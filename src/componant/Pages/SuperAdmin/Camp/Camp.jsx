import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Tabs, Tab, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import EditIcon from '@mui/icons-material/Edit';

const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Cairo, Arial, sans-serif',
  },
});

const days = [
  { label: 'الأحد 7 يوليو', date: '2024-07-07' },
  { label: 'الاثنين 8 يوليو', date: '2024-07-08' },
  { label: 'الثلاثاء 9 يوليو', date: '2024-07-09' },
  { label: 'الأربعاء 10 يوليو', date: '2024-07-10' },
  { label: 'الخميس 11 يوليو', date: '2024-07-11' },
  { label: 'الجمعة 12 يوليو', date: '2024-07-12' },
  { label: 'السبت 13 يوليو', date: '2024-07-13' },
  { label: 'الأحد 14 يوليو', date: '2024-07-14' },
  { label: 'الاثنين 15 يوليو', date: '2024-07-15' },
];

const defaultSchedule = [
  { time: '04:10', activity: 'صلاة الفجر' },
  { time: '08:00', activity: 'وجبة الإفطار' },
  { time: '11:10', activity: 'الوصول إلى مطار الشارقة' },
  { time: '12:30', activity: 'صلاة الظهر' },
  { time: '13:00', activity: 'وجبة الغداء' },
  { time: '14:00', activity: 'راحة' },
  { time: '15:50', activity: 'صلاة العصر' },
  { time: '17:30', activity: 'مباراة (تحت 14 سنة)' },
  { time: '19:30', activity: 'مباراة (تحت 12 سنة)' },
  { time: '20:00', activity: 'وجبة العشاء' },
];

export default function Camp() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ time: '', activity: '' });

  const handleEditClick = (item, index) => {
    setEditingItem({ ...item, index });
    setEditForm({ time: item.time, activity: item.activity });
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    if (editingItem !== null) {
      const newSchedule = [...schedule];
      if (editingItem.index === schedule.length) {
        // Adding new item
        newSchedule.push({ ...editForm });
      } else {
        // Editing existing item
        newSchedule[editingItem.index] = { ...editForm };
      }
      setSchedule(newSchedule);
    }
    setEditDialogOpen(false);
    setEditingItem(null);
    setEditForm({ time: '', activity: '' });
  };

  const handleEditCancel = () => {
    setEditDialogOpen(false);
    setEditingItem(null);
    setEditForm({ time: '', activity: '' });
  };

  const handleAddNew = () => {
    setEditingItem({ index: schedule.length });
    setEditForm({ time: '', activity: '' });
    setEditDialogOpen(true);
  };

  // في الوقت الحالي، الجدول ثابت لكل الأيام. يمكنك لاحقاً تخصيص جدول كل يوم حسب الحاجة.
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ direction: 'rtl', p: { xs: 1, md: 4 }, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
        <Box sx={{ maxWidth: 900, mx: 'auto', my: 4, bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: { xs: 2, md: 4 } }}>
          {/* شريط الأيام */}
          <Tabs
            value={selectedDay}
            onChange={(_, v) => setSelectedDay(v)}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{ mb: 3, borderRadius: 2, background: '#f1f3f6', minHeight: 48, direction: 'rtl' }}
            TabIndicatorProps={{ style: { background: '#1976d2', height: 4, borderRadius: 2 } }}
          >
            {days.map((day, idx) => (
              <Tab
                key={day.date}
                label={day.label}
                sx={{ fontWeight: selectedDay === idx ? 700 : 500, fontSize: 16, fontFamily: 'Cairo', minHeight: 48 }}
              />
            ))}
          </Tabs>
          {/* عنوان اليوم */}
          <Typography variant="h6" align="center" fontWeight={700} mb={3} fontFamily="Cairo">
            {days[selectedDay].label} 2024
          </Typography>
          
          {/* زر إضافة نشاط جديد (فقط ليوم 7 يوليو) */}
          {selectedDay === 0 && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Button 
                variant="contained" 
                onClick={handleAddNew}
                sx={{ 
                  fontFamily: 'Cairo', 
                  fontWeight: 600,
                  backgroundColor: '#1976d2',
                  '&:hover': { backgroundColor: '#1565c0' }
                }}
              >
                إضافة نشاط جديد
              </Button>
            </Box>
          )}

          {/* جدول اليوم */}
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f1f3f6' }}>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: 18, fontFamily: 'Cairo' }}>النشاط</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: 18, fontFamily: 'Cairo' }}>الوقت</TableCell>
                  {selectedDay === 0 && (
                    <TableCell align="center" sx={{ fontWeight: 700, fontSize: 18, fontFamily: 'Cairo' }}>تعديل</TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {schedule.map((row, idx) => (
                  <TableRow key={idx} sx={{ backgroundColor: idx % 2 === 0 ? '#fafbfc' : '#fff' }}>
                    <TableCell align="center" sx={{ fontSize: 16 }}>{row.activity}</TableCell>
                    <TableCell align="center" sx={{ fontSize: 16 }}>{row.time}</TableCell>
                    {selectedDay === 0 && (
                      <TableCell align="center">
                        <IconButton 
                          onClick={() => handleEditClick(row, idx)}
                          sx={{ color: '#1976d2' }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* نافذة التعديل */}
        <Dialog open={editDialogOpen} onClose={handleEditCancel} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontFamily: 'Cairo', fontWeight: 700, textAlign: 'center' }}>
            {editingItem?.index === schedule.length ? 'إضافة نشاط جديد' : 'تعديل النشاط'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="الوقت"
                value={editForm.time}
                onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                sx={{ mb: 2, fontFamily: 'Cairo' }}
                placeholder="مثال: 08:00"
              />
              <TextField
                fullWidth
                label="النشاط"
                value={editForm.activity}
                onChange={(e) => setEditForm({ ...editForm, activity: e.target.value })}
                sx={{ fontFamily: 'Cairo' }}
                placeholder="مثال: وجبة الإفطار"
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button 
              onClick={handleEditCancel} 
              sx={{ fontFamily: 'Cairo', fontWeight: 600 }}
            >
              إلغاء
            </Button>
            <Button 
              onClick={handleEditSave} 
              variant="contained"
              sx={{ 
                fontFamily: 'Cairo', 
                fontWeight: 600,
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' }
              }}
            >
              حفظ
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}
