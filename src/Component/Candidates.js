import React  from 'react';
const CandidateDetails = ({candidate_info}) => {
    return (
        <div>
            <centre><h1>Candidate list</h1></centre>
            {CandidateDetails.map((Candidate) => (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{Candidate.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{Candidate.email}</h6>
                <p class="card-text">{Candidate}</p>
              </div>
            </div>
          ))}
        </div>
    )
};

export default CandidateDetails;