import styles from './App.module.css';
import LoginButton from './Components/LoginButton/LoginButton';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.modal}>
      <LoginButton/>
     
      </div>
    </div>
  );
}

export default App;
