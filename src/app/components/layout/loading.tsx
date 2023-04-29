import React from 'react';
import styles from '@/app/styles/Loading.module.scss';

export const Loading = ({ className }: any) => {
    return (
        <div
            data-testid="loading-test"
            className={`${styles.spinner_container} ${className}`}>
            <div className={styles.loading_spinner}></div>
        </div>
    );
};
