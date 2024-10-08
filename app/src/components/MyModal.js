const MyModal = (props) => {
    return (
        <>
            <div id={props.id} className="modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title}</h5>
                            <button 
                            id={props.id + '_btnClose'} 
                            className="btn-close" 
                            type="button"
                            data-bs-dismiss="modal"
                            aria-label="close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyModal;