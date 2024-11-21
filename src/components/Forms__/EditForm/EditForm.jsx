import React, { useState } from "react";

function EditForm() {
  const [iunderstand, setIUnderstand] = useState(false);

  return (
    <div>
      <h1>
        The form you are editing will create a new form with edited data and the
        old one remains
      </h1>
      <input
        type="checkbox"
        value={iunderstand}
        onChange={(e) => setIUnderstand(e.target.checked)}
      />
      {iunderstand && <div className="understood">
        
        </div>}
    </div>
  );
}

export default EditForm;
