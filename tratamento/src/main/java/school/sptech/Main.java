package school.sptech;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import school.sptech.database.Database;
import school.sptech.database.dao.DadosServidorDao;
import school.sptech.database.entities.DadosServidorEntity;

import java.util.List;

public class Main {
    private static JdbcTemplate conexao;
    public static void main(String[] args) {
        Database database = new Database();
        conexao = database.getTemplate();
        DadosServidorDao dadosServidorDao = new DadosServidorDao(conexao);

//        conexao.update("insert into Servidor values (default, 'c7d12465a943', 1, 1)");
        System.out.println(dadosServidorDao);
    }
}
