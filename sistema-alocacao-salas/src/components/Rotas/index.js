import { BrowserRouter, Route, Routes} from 'react-router-dom';



function Rotas() {
    return ( 

        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App/>} />
                <Route path="/salas" element={<Salas/>} />
            </Routes>
        </BrowserRouter>

    );
 } export default Rotas