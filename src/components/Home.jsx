import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext";
import woodData from './WoodData';
import users from './userData';




const Home = () => {
  const { setUserId } = useUser();
  const navigate = useNavigate(); 

  const handleUserClick = (userId) => {
    setUserId(userId);
    navigate(`/Page3`);
  };



  const HomeStyle = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100vh', // 画面の高さを100vhに設定して、中央に配置
      paddingTop: '30vh',
      backgroundColor: '#111111', // 背景色は黒
      color: 'white', // 文字色は白
    },
    title: {
      textAlign: 'center', // タイトルを中央揃え
      marginBottom: '100px', // ユーザーボタンとの間隔
    },
    userButtonsContainer: {
      display: 'flex', // フレックスボックスでユーザーボタンを横並びに
      justifyContent: 'center', // 中央揃え
      gap: '50px', // ボタン間の間隔
    },
    userButton: {
      width: '100px', // ボタンのサイズを正方形に
      height: '100px',
      backgroundColor: 'grey', // ボタンの背景色
      color: 'white', // ボタンの文字色
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px', // ボタンの角を丸く
      border: '1px solid #ffffff',
      padding: '0px',
      overflow: 'hidden',
    },
    userInfo: {
      textAlign: 'center', // テキストを中央寄せ
      color: 'white', // テキストの色
    },
    userImage:{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }
  };

  return (
    <div style={HomeStyle.container}>
      <h1 style={HomeStyle.title}>WOODNFT APP DEMO</h1>
      <div style={HomeStyle.userButtonsContainer}>
        {users.map((user) => (
          <div key={user.id} onClick={()=>handleUserClick(user.userId)}>
            <button style={HomeStyle.userButton}>
              <img src={"/woodnft-demo/user/"+user.imageUrl} alt={user.name} style={HomeStyle.userImage } />
            </button>
            <div style={HomeStyle.userInfo}>
              <div>{user.name}</div>
              <div>{user.location}</div>
              <div>{user.occupation}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
    
};

export default Home;

