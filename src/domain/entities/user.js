export default class User {
    constructor(id, name, email, password, role, createdAt = null, updatedAt = null, deletedAt = null, createdBy = null, updatedBy = null, deletedBy = null) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;

        // Nullable Audit Fields
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.deletedBy = deletedBy;
    }
}