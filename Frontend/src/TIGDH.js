import React from "react";
import SetlistList from "./SetlistList";

function TIGDH() {
    const today = new Date();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();

    month = month.length === 1 ? "0" + month : month;
    day = day.length === 1 ? "0" + day : day;

    return (
        <SetlistList today={{ month, day }} />
    )

}

export default TIGDH;