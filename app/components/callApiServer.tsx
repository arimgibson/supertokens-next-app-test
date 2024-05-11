"use client";

import { fetchUserData } from "../data/fetchUserData";
import styles from "../page.module.css";

export const CallServerButton = () => {
    return (
        <div onClick={async () => {const data = await fetchUserData(); alert(JSON.stringify(data))}} className={styles.sessionButton}>
            Call API
        </div>
    );
};
