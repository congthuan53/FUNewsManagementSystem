// Author: Tran Cong Thuan | Date: 29/10/2026 | Assignment: Assignment 1

import Modal from "./Modal";

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <Modal title={title || "Confirm"} onClose={onCancel} width="420px">
      <p className="confirm-message">{message}</p>
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>
          Delete
        </button>
      </div>
    </Modal>
  );
}
