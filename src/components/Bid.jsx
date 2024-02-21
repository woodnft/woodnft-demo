import React from "react";

const Bid = (props) => {
    const closeModal = () => {
        props.setShowModal(false);
    };

    const handleOverlayClick = (e) => {
        // オーバーレイがクリックされた場合のみモーダルを閉じる
        if (e.target.id === "overlay") {
            closeModal();
        }
    };

    return (
        <>
            {props.showFlag && ( // showFlagがtrueの場合にのみ表示する
                <div id="overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0, 0, 0, 0.5)', zIndex: 1000 }} onClick={handleOverlayClick}>
                    <div id="modalContent" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '8px' }}>
                        <h3>入札欄</h3>
                        <p>ETH<br></br>
                        <input type="text"></input><br></br>
                        過去の生産者への分配値も含みます
                        </p>

                        <button onClick={closeModal}>入札</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Bid;
