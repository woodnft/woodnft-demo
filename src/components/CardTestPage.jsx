import Card from './Card';

const TestPage = () => {

    return (
        <div>
            <h1>カード表示テスト</h1>

            <div style={{display:'flex', justifyContent: 'center' }}>
                <Card id="2"></Card>
            </div>
            

        </div>
    );

};

export default TestPage;