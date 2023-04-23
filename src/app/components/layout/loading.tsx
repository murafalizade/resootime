import React from 'react';
import styles from '@/app/styles/Loading.module.scss';

export const Loading = () => {
    return (
        <div data-testid="loading-test" className={styles.spinner_container}>
            <div className={styles.loading_spinner}></div>
        </div>
    );
};
