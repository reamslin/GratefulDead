import React from "react";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Recording from "./Recording";
import { Typography, List, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%'
    }
}));

function RecordingAccordion({ recordings, setMusic, openMusic, setlistInfo }) {
    const classes = useStyles();
    return (
        recordings.length === 0 ? <> </> :
            <Accordion
                elevation={4}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant='h5'> Recordings  </Typography>
                </AccordionSummary>
                <AccordionDetails >
                    <List className={classes.list}>
                        {recordings.map(r => <Recording
                            setMusic={setMusic}
                            key={r.id}
                            info={{
                                recording: r,
                                month: setlistInfo.month,
                                day: setlistInfo.day,
                                year: setlistInfo.year
                            }}
                            openMusic={openMusic} />)}
                    </List>
                </AccordionDetails>
            </Accordion>
    )
}

export default RecordingAccordion;