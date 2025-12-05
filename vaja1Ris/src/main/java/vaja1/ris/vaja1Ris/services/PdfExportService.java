package vaja1.ris.vaja1Ris.services;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Service;
import vaja1.ris.vaja1Ris.dao.RecipesDao;
import vaja1.ris.vaja1Ris.models.Recipe;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;



import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;

@Service
public class PdfExportService {

    private final RecipesDao recipesDao;

    public PdfExportService(RecipesDao recipesDao) {
        this.recipesDao = recipesDao;
    }

    public byte[] generatePdfForRecipe(Long id) throws IOException {

        Recipe recipe = recipesDao.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found"));



        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream content = new PDPageContentStream(document, page);

        new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);




        int y = 750; // start height

        // Title
        content.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 20);
        content.beginText();
        content.newLineAtOffset(50, y);
        content.showText(recipe.getName());
        content.endText();

        y -= 40;

        // Title font (bold)
        content.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD), 20);

// Normal font
        content.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA), 12);


        // Description
        content.beginText();
        content.newLineAtOffset(50, y);
        content.showText("Description: " + recipe.getDescription());
        content.endText();
        y -= 20;

        // Duration
        content.beginText();
        content.newLineAtOffset(50, y);
        content.showText("Duration: " + recipe.getDuration() + " minutes");
        content.endText();
        y -= 20;

        // Category
        content.beginText();
        content.newLineAtOffset(50, y);
        content.showText("Category: " + recipe.getCategory());
        content.endText();
        y -= 20;

        // Ingredients
        content.beginText();
        content.newLineAtOffset(50, y);
        content.showText("Ingredients: " + recipe.getIngredients());
        content.endText();
        y -= 20;

        // Instructions
        content.beginText();
        content.newLineAtOffset(50, y);
        content.showText("Instructions: " + recipe.getInstructions());
        content.endText();

        content.close();

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        document.save(baos);
        document.close();

        return baos.toByteArray();
    }
}
