package school.sptech.database.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.entities.EmpresaEntity;

import java.util.List;

public class EmpresaDao {
    private JdbcTemplate conexao;

    public EmpresaDao(JdbcTemplate conexao) {
        this.conexao = conexao;
    }

    public String selectById(Integer id) {
        String resultado = "";
        List<EmpresaEntity> emails = conexao.query("select * from Empresa where id = " + id, new BeanPropertyRowMapper(EmpresaEntity.class));

        for (EmpresaEntity email : emails) resultado += email.getInfo() + "\n";
        return resultado;
    }

    public Integer insert(String razaoSocial, String nomeFantasia, String email, String cnpj, String telefone) {
        return conexao.update("insert into Empresa (razaoSocial, nomeFantasia, email, cnpj, telefone) values (?, ?, ?, ?, ?)", razaoSocial, nomeFantasia, email, cnpj, telefone);
    }

    public Integer update(Integer id, String razaoSocial, Integer nomeFantasia, Integer email, String cnpj, String telefone) {
        return conexao.update("update Empresa set razaoSocial = ?, nomeFantasia = ?, email = ?, cnpj = ?, telefone = ? where id = ?", razaoSocial, nomeFantasia, email, cnpj, telefone, id);
    }

    public Integer delete(Integer id) {
        return conexao.update("delete from Empresa where id = ?", id);
    }
}
