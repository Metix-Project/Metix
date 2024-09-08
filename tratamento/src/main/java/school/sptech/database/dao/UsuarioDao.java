package school.sptech.database.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.entities.UsuarioEntity;

import java.util.List;

public class UsuarioDao {
    private JdbcTemplate conexao;

    public UsuarioDao(JdbcTemplate conexao) {
        this.conexao = conexao;
    }

    public String selectById(Integer id) {
        String resultado = "";
        List<UsuarioEntity> emails = conexao.query("select * from Usuario where id = " + id, new BeanPropertyRowMapper(UsuarioEntity.class));

        for (UsuarioEntity email : emails) resultado += email.getInfo() + "\n";
        return resultado;
    }

    public Integer insert(String nome, String email, String senha, String cpf, String telefone, String cargo, Integer fkEmpresa) {
        return conexao.update("insert into Usuario (nome,  email,  senha,  cpf,  telefone,  cargo,  fkEmpresa) values (?, ?, ?, ?, ?, ?, ?)", nome,  email,  senha,  cpf,  telefone,  cargo,  fkEmpresa);
    }

    public Integer update(Integer id, String nome, String email, String senha, String cpf, String telefone, String cargo, Integer fkEmpresa) {
        return conexao.update("update Usuario set nome = ?, email = ?, senha = ?, cpf = ?, telefone = ?, cargo = ?, fkEmpresa = ? where id = ?", nome,  email,  senha,  cpf,  telefone,  cargo,  fkEmpresa, id);
    }

    public Integer delete(Integer id) {
        return conexao.update("delete from Usuario where id = ?", id);
    }
}
