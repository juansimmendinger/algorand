import React from 'react';
import {Button} from "react-bootstrap";
import PropTypes from 'prop-types';

const CoverAlgoSigner = ({name, coverImg, connectAlgoSigner}) => {
    return (
        <div className="d-flex justify-content-center flex-column text-center bg-black">
            <div className="mt-auto text-light mb-5">
                <div
                    className=" ratio ratio-1x1 mx-auto mb-2"
                    style={{maxWidth: "100px"}}
                >
                    <img src={coverImg} alt=""/>
                </div>
                <h1>{name}</h1>
                <p>Please connect your wallet to continue.</p>
                <Button
                    onClick={() => connectAlgoSigner()}
                    variant="outline-light"
                    className="rounded-pill px-3 mt-3"
                >
                    Connect Algo Signer Wallet
                </Button>
            </div>
            
        </div>
    );
};
const CoverPera = ({name, coverImg, connectPera}) => {
    return (
        <div className="d-flex justify-content-center flex-column text-center bg-black">
            <div className="mt-auto text-light mb-5">
                <div
                    className=" ratio ratio-1x1 mx-auto mb-2"
                    style={{maxWidth: "100px"}}
                >
                    <img src={coverImg} alt=""/>
                </div>
                <h1>{name}</h1>
                <p>Please connect your wallet to continue.</p>
				<Button
                    onClick={() => connectPera()}
                    variant="outline-light"
                    className="rounded-pill px-3 mt-3"
                >
                    Connect Pera Wallet
                </Button>
            </div>
            
        </div>
    )
}

CoverAlgoSigner.propTypes = {
    name: PropTypes.string,
    coverImg: PropTypes.string,
    connectAlgoSigner: PropTypes.func
}

CoverPera.propTypes = {
    name: PropTypes.string,
    coverImg: PropTypes.string,
    connectPera: PropTypes.func
}

export { CoverAlgoSigner, CoverPera }