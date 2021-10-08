import React from "react"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import styles from './newPost.module.css';

const PrimarySection = ({item}) => {
  return (
    <>
      <span className={styles.nameStyleTwo}>
        {item.relatedUsers[0]?.user.fullName}
      </span>
      {item.isRead === false && (
        <FiberManualRecordIcon
          style={{
            fontSize: '10px',
            marginLeft: '3px',
            marginBottom: '1px',
          }}
        />
      )}
    </>
  );
}

export default PrimarySection
