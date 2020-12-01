function FormSearch({ keyword, onChangeKeyword, onHandleSubmitForm }) {
  return (
    <div className="d-flex" id="form">
      <input
        value={keyword}
        onChange={onChangeKeyword}
        className="form-control"
      />
      <button
        className="btn btn-primary ml-2"
        onClick={onHandleSubmitForm}
      >
        Tìm
        </button>
    </div>
  )
}

export default FormSearch;
