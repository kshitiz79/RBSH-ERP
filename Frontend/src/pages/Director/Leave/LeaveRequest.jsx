const LeaveRequests = ({ requests }) => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex items-center justify-between bg-white shadow-md p-4 rounded mb-2"
          >
            <div>
              <p><strong>Name:</strong> {req.name}</p>
              <p><strong>Dates:</strong> {req.start} - {req.end}</p>
              <p><strong>Reason:</strong> {req.reason}</p>
            </div>
            <div>
              <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">Approve</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default LeaveRequests;
  