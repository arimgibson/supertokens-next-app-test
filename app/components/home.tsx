
import { TryRefreshComponent } from "./tryRefreshClientComponent";
import styles from "../page.module.css";
import { redirect } from "next/navigation";
import Image from "next/image";
import { CelebrateIcon, SeparatorLine } from "../../assets/images";
import { CallServerButton } from "./callApiServer";
import { LinksComponent } from "./linksComponent";
import { SessionAuthForNextJS } from "./sessionAuthForNextJS";
import { ensureSuperTokensInit } from "../config/backend";
import { getSSRSessionHelper } from "./getSSRHelper";

ensureSuperTokensInit();

export async function HomePage() {
    const { session, hasToken, hasInvalidClaims, error } = await getSSRSessionHelper();

    if (error) {
        return <div>Something went wrong while trying to get the session. Error - {error.message}</div>;
    }

    if (!session) {
        if (!hasToken) {
            /**
             * This means that the user is not logged in. If you want to display some other UI in this
             * case, you can do so here.
             */
            return redirect("/auth");
        }

        if (hasInvalidClaims) {
            return <SessionAuthForNextJS />;
        } else {
            // To learn about why the 'key' attribute is required refer to: https://github.com/supertokens/supertokens-node/issues/826#issuecomment-2092144048
            return <TryRefreshComponent key={Date.now()} />;
        }
    }

    return (
        <SessionAuthForNextJS>
            <div className={styles.homeContainer}>
                <div className={styles.mainContainer}>
                    <div className={`${styles.topBand} ${styles.successTitle} ${styles.bold500}`}>
                        <Image src={CelebrateIcon} alt="Login successful" className={styles.successIcon} /> Login
                        successful
                    </div>
                    <div className={styles.innerContent}>
                        <div>Your userID is:</div>
                        <div className={`${styles.truncate} ${styles.userId}`}>{session.getUserId()}</div>
                        {/* <CallAPIButton /> */}
                        <CallServerButton />
                    </div>
                </div>
                <LinksComponent />
                <Image className={styles.separatorLine} src={SeparatorLine} alt="separator" />
            </div>
        </SessionAuthForNextJS>
    );
}
