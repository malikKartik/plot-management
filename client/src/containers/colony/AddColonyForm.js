const AddColonyForm = ({ formData, setFormData, addPlot }) => {
  return (
    <>
      <input
        type="text"
        placeholder="प्लॉट नंबर"
        value={formData.plotNumber}
        onChange={(e) => {
          setFormData({ ...formData, plotNumber: e.target.value });
        }}
      />
      <br />
      <input
        type="text"
        placeholder="मालिक"
        value={formData.owner}
        onChange={(e) => {
          setFormData({ ...formData, owner: e.target.value });
        }}
      />
      <br />
      <input
        type="text"
        placeholder="फ़ोन नंबर"
        value={formData.phoneNumber}
        onChange={(e) => {
          setFormData({ ...formData, phoneNumber: e.target.value });
        }}
      />
      <br />
      <input
        type="text"
        placeholder="area/क्षेत्र"
        value={formData.area}
        onChange={(e) => {
          setFormData({ ...formData, area: e.target.value });
        }}
      />
      <br />
      <input
        type="text"
        placeholder="कीमत"
        value={formData.price}
        onChange={(e) => {
          setFormData({ ...formData, price: e.target.value });
        }}
      />
      <br />
      <button onClick={addPlot}>Add</button>
    </>
  );
};

export default AddColonyForm;
