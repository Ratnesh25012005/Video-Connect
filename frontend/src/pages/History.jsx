// import React, { useContext, useState } from 'react'
// import { AuthContext } from '../contexts/AuthContext'
// import { Snackbar } from '@mui/material';

// export default function History() {
//     const {getHistoryOfUser} = useContext(AuthContext)

//     const [meetings,setMeetings] =useState([])

//     const routeTo=useNavigate();

//     useEffect(()=>{
//         try{
//             const history = await getHistoryOfUser();
//             setMeetings(history);
//         }catch{

//         }
//         fetchHistory();
//     },[])
//   return (
//     <div>
//       History
//       <Snackbar
//         open={open}
//         autoHideDuration={4000}
//         onClose={() => setOpen(false)}
//       >
//         <Alert onClose={() => setOpen(false)} severity="error" variant="filled">
//           {error}
//         </Alert>
//       </Snackbar>
//     </div>
//   )
// }

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert, IconButton } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const routeTo = useNavigate();

  const [meetings, setMeetings] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (err) {
        const msg =
          err?.response?.data?.message || "Could not load meeting history";
        setError(msg);
        setOpen(true);
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);
  <IconButton onClick={()=>{
                routeTo("/home")
            }}>
                <HomeIcon/>
            </IconButton>

    let formatDate=(dateString)=>{
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2,"0");
        const month = (date.getMonth()+ 1).toString().padStart(2,"0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`
    }   
  return (
    <div>
      {meetings.map((e,i) => {
        return (
          <>
            
            <Card key={i} variant="outlined">
              <React.Fragment>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                     Code: {e.meetingCode}
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    Date:{formatDate(e.date)}
                  </Typography>
                </CardContent>
              </React.Fragment>
            </Card>
          </>
        );
      })}

      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
