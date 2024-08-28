
import "./footer.css"

export default function Footer(){


    return<div>
        <div className="pt-4 pb-4 rounded border mt-4 footer" >
            <footer className="mt-3"  >
                <div className="row d-flex align-items-center">
                    <div className="col-lg-6 d-flex  gap-3 flex-wrap" style={{ flexGrow: 1 }}>
                        <a href="#" className="text-muted text-decoration-none">Technical support</a>
                        <a href="#" className="text-muted text-decoration-none">Downloads</a>
                        <a href="#" className="text-muted text-decoration-none">Report a malfunction</a>
                        <a href="#" className="text-muted text-decoration-none">Developers</a>
                        <a href="#" className="text-muted text-decoration-none">Privacy Policy</a>
                        <a href="#" className="text-muted text-decoration-none">Visit Website</a>
                    </div>
                    <div className="col-lg-5 text-muted text-center" style={{ flexGrow: 0 }}>
                        &copy; 2024 .Law Surface. All Rights Reserved to LS Cloud Service Company
                    </div>
                    <div className="col-lg-1 text-center" style={{ flexGrow: 0 }}>
                        my logo
                    </div>
                </div>
            </footer>
        </div>

    </div>
}