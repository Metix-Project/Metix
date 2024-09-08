package school.sptech.database.dao;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.entities.DadosServidorEntity;

import java.util.List;

public class DadosServidorDao {
    private JdbcTemplate conexao;

    public DadosServidorDao(JdbcTemplate conexao) {
        this.conexao = conexao;
    }

    public String selectLast(Integer limite) {
        String resultado = "";
        List<DadosServidorEntity> dadosServidor = conexao.query("select * from DadosServidor order by dataHora desc limit " + limite, new BeanPropertyRowMapper(DadosServidorEntity.class));

        for (DadosServidorEntity dadoServidor : dadosServidor) resultado += dadoServidor.getInfo() + "\n";
        return resultado;
    }
}
