import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = ({ user }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchMyProjects = async () => {
            const res = await axios.get(`http://localhost:5000/api/my-projects/${user.id}`);
            setProjects(res.data);
        };
        if (user) fetchMyProjects();
    }, [user]);

    return (
        <div className="section-inner" style={{paddingTop: '80px'}}>
            <h2 className="section-title">Мої проекти та завдання</h2>
            <div className="startup-grid">
                {projects.length > 0 ? projects.map(p => (
                    <div key={p._id} className="startup-card">
                        <div className="badge badge-amber">{p.status}</div>
                        <h3 className="card-title" style={{marginTop: '10px'}}>{p.title}</h3>
                        <p className="param-name">Пріоритет: {p.priority}</p>
                        <p className="param-name">Дедлайн: {p.deadline}</p>
                    </div>
                )) : <p>У вас ще немає створених завдань.</p>}
            </div>
        </div>
    );
};

export default ProfilePage;