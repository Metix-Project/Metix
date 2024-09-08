package school.sptech.database.entities;

public class UsuarioEntity {
    Integer id;
    String nome;
    String email;
    String senha;
    String cpf;
    String telefone;
    String cargo;
    Integer fkEmpresa;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Integer getFkEmpresa() {
        return fkEmpresa;
    }

    public void setFkEmpresa(Integer fkEmpresa) {
        this.fkEmpresa = fkEmpresa;
    }

    public String getInfo() {
        return "{ id: " + getId() +
        ", nome: " + getNome() +
                ", email: " + getEmail() +
                ", senha: " + getSenha() +
                ", cpf: " + getCpf() +
                ", telefone: " + getTelefone() +
                ", cargo: " + getCargo() +
                ", fkEmpresa: " + getFkEmpresa() + " }";
    }
}
