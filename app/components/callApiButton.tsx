"use client";

import styles from "../page.module.css";

export const CallAPIButton = () => {
    const fetchUserData = async () => {
        const userInfoResponse = await fetch("http://localhost:3001/sessioninfo");

        alert(JSON.stringify(await userInfoResponse.json()));
    };

    return (
        <div onClick={fetchUserData} className={styles.sessionButton}>
            Call API
        </div>
    );
};
